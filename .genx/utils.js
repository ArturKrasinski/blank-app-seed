const {existsSync, mkdirSync, readFileSync} = require('node:fs');
const { resolve } = require('node:path');

const makeDirectory = (directory) => {
  if (!existsSync(directory)) {
    mkdirSync(directory);
  }
};

const registerPartials = ({ registerPartial }) => {
  registerPartial('grid-layout', resolve(__dirname, 'templates/gridLayout.hbs'))
  registerPartial('tabs-layout', resolve(__dirname, 'templates/tabsLayout.hbs'))
  registerPartial('horizontal-layout', resolve(__dirname, 'templates/horizontalLayout.hbs'))
  registerPartial('smart-form', resolve(__dirname, 'templates/form.hbs'))
  registerPartial('chart', resolve(__dirname, 'templates/chart.hbs'))
  registerPartial('entity-manager', resolve(__dirname, 'templates/entityManager.hbs'))
  registerPartial('grid-pro', resolve(__dirname, 'templates/grid.hbs'))
};

const generateRoute = (route, { writeFileWithData, changeCase }) => {
  const routeName = changeCase.paramCase(route.name);
  makeDirectory(resolve(__dirname, `../client/src/routes/${routeName}`));
  writeFileWithData(resolve(__dirname, `../client/src/routes/${routeName}/${routeName}.ts`), {route}, resolve(__dirname, 'templates/route.hbs'));
  writeFileWithData(resolve(__dirname, `../client/src/routes/${routeName}/${routeName}.template.ts`), {route}, resolve(__dirname, 'templates/route.template.hbs'));
  writeFileWithData(resolve(__dirname, `../client/src/routes/${routeName}/${routeName}.styles.ts`), {route}, resolve(__dirname, 'templates/route.styles.hbs'));
};

const generateCsv = (entity, { writeFileWithData }) => {
  writeFileWithData(resolve(__dirname, `../server/{{appName}}-app/src/main/genesis/data/${entity.name}.csv`), {entity}, resolve(__dirname, 'templates/csv.hbs'));
};

const prepareCsvData = (entity) => {
  if (!entity.data?.length) return null;

  const data = entity.data.map((rows) => ({
    rows: rows?.map((x, index) => ({
      name: x,
      isLast: index === rows.length - 1,
    })),
  }));

  return data;
};

function csvToObject(csv) {
  const lines = csv
    .split('\n')
    .map((x) => x.replaceAll('"', ''))
    .filter((line) => line.trim() !== '');
  const fieldsRow = lines[0].split(',').map((field) => field.trim());
  const fields = fieldsRow.map((field, index) => ({
    name: field.toUpperCase(),
    isLast: index === fieldsRow.length - 1,
  }));

  const data = lines.slice(1).map((line) => {
    const rows = line.split(',').map((value, index) => ({
      name: value.trim(),
      isLast: index === fieldsRow.length - 1,
    }));
    return { rows };
  });

  return { fields, data };
}

const getCombinedCsvData = (entity) => {
  let csvFile;
  const combinedCsv = {
    name: entity.name.toUpperCase(),
    fields: entity.fields?.map((field, index) => ({
      name: field.toUpperCase(),
      isLast: index === entity.fields.length - 1,
    })),
    data: prepareCsvData(entity),
  };

  if (entity.mode?.toLowerCase() === 'append') {
    const path = resolve(
      __dirname,
      `../server/{{appName}}-app/src/main/genesis/data/${entity.name}.csv`
    );

    try {
      csvFile = readFileSync(path, 'utf8');
    } catch (err) {
      console.log('File to append not found - creating a new CSV file');
    }

    if (csvFile) {
      const existingCsv = csvToObject(csvFile);
      combinedCsv.fields = existingCsv.fields;
      combinedCsv.data = [...existingCsv.data, ...prepareCsvData(entity)];
    }
  }

  return combinedCsv;
};

const formatJSONValue = (value) => {
  try {
    return value ? JSON.stringify(value, null, 2) : undefined;
  } catch (e) {
    console.warn('Could not serialise value to JSON', value, e);
  }
}

const gridOptionsSerializer = (options, pad = '      ') => {
  if (!options) {
    return undefined;
  }
  try {
    let output = `{\n`;
    Object.keys(options).forEach((key) => {
      const value = options[key];
      if (key === 'columns') {
        output += `${pad}${'columnDefs'}: ${gridColumnsSerializer(value)},\n`; 
      } else if (value?.type === 'function' || value?.type === 'valueFormatter') {
        const args =  value.arguments?.map(JSON.stringify).join(', ');
        output += `${pad}${key}: ${value.name}(${args}),\n`;
      } else if (key === 'hide') {
        output += `${pad}${key}: ${value},\n`;
      } else {
        output += `${pad}${key}: ${formatJSONValue(value)},\n`;
      }
    });
    output += `${pad}}\n`;
    return output;
  } catch (e) {
    return undefined;
  }
};

 const gridColumnsSerializer = (columns, pad = '      ') => {
  if (!columns) {
    return undefined;
  }
  try {
    const columnsSerialized = columns.map((column) => gridOptionsSerializer(column));
    return `[\n${pad}${columnsSerialized}]`;
  } catch (e) {
    return undefined;
  }
}

const validateRoute = (route) => {
  if (!route.name) {
    console.warn('Invalid route - missing name', route);
  }
  return !!route.name;
}

const getLayoutType = (route) => {
  if (route?.tiles?.length < 4) {
    return 'horizontal-layout'
  } else if (route?.tiles?.length === 4) {
    return 'grid-layout'
  } 
  return 'tabs-layout'
}

const formatRouteData = (route) => {
  const layoutKey = route?.layoutKey || `${route.name}_${Date.now()}`;
  const layoutType = route?.layoutType || getLayoutType(route);

  const FDC3ClickCategory = 'fdc3';
  const FDC3EventHandlersEnabled = !!route.tiles?.find(t => t.config?.gridOptions?.onRowClicked?.category === FDC3ClickCategory);

  const tiles = route.tiles?.map(tile => ({
    ...tile,
    config: {
      ...(tile.config || {}),
      gridOptions: gridOptionsSerializer(tile.config?.gridOptions),
      createFormUiSchema: formatJSONValue(tile.config?.createFormUiSchema),
      updateFormUiSchema: formatJSONValue(tile.config?.updateFormUiSchema),
      uischema: formatJSONValue(tile.config?.uischema),
      columns: gridColumnsSerializer(tile.config?.columns)
    }
  }));

  return {
    ...route,
    layoutType,
    layoutKey,
    tiles,
    FDC3EventHandlersEnabled,
  }
};

const parseJSONArgument = (name, defaultValue) =>
  (value) => {
    if (!value){
      return defaultValue;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing "${name}" parameter as JSON:`, error.message);
      return defaultValue;
    }
  }

module.exports = {
  makeDirectory,
  registerPartials,
  generateRoute,
  validateRoute,
  generateCsv,
  getCombinedCsvData,
  formatRouteData,
  parseJSONArgument,
};
