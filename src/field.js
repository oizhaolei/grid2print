export const standardFields = [{
  key: 'issuetype',
  headerName: 'Type',
  tree: true,
  table: true,
  path: 'name',
  width: 120,
  headerCheckboxSelection: true,
  headerCheckboxSelectionFilteredOnly: true,
  checkboxSelection: true,
}, {
  key: 'issuekey',
  headerName: 'Key',
  tree: false,
  table: true,
  path: 'key',
  width: 120,
}, {
  key: 'summary',
  headerName: 'Summary',
  tree: false,
  table: true,
  path: 'summary',
  width: 250,
}];

