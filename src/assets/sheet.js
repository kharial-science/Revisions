const GoogleSheets = require('google-drive-sheets')

export default class Sheet {
    constructor() {
        // spreadsheet key is the long id in the sheets URL
        var mySheet = new GoogleSheets('13116MH8PX-pqPIc_aAh5Uj9RczH8ns0B1uwkRTV21uM')

        console.log(mySheet)

        const showInfos = (err, rowData) => {
            console.error(err)
            console.log(rowData)
        }

        mySheet.getRows(1, showInfos)
    }
}