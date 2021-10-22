// column configs
// type can be text or dropdown or html input types
// for dropdown using the of dict property from all lookups
export const sampleColumnConfig = [
  { id: 1, name: 'id' , title:'Id' , type: 'text' , size:'20px' ,style:'' , lookup: ''},
  { id: 2, name: 'name', title: 'Full Name', type: 'text', size: '120px', style: '', lookup: ''},
  {
    id: 3, name: 'cityId', title: 'City Name', type: 'dropdown',
    size: '120px', style: '', lookup: 'city'
  },
  {
    id: 4, name: 'fruitId', title: 'Poplular Food', type: 'dropdown',
    size: '120px', style: '', lookup: 'fruits'
  }

]
