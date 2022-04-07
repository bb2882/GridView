class GridView {
    constructor() {
        this._header = ''
        this._headerClass = []
        this._tableClass = []
        this._element = 'body'
        this.attribute = []
    }

    setHeader(header) {
        if (typeof header === "string" && header.trim() != '') {
            this._header = header.trim()
            return true
        }
        return false
    }

    setHeaderClass(headerClass) {
        if (typeof headerClass === "object") {
            this._headerClass = headerClass
            return true
        }
        return false
    }

    setElement(element) {
        if (document.querySelector(element)) {
            this._element = document.querySelector(element)
            return true
        }
        return false
    }

    
    render(data) {
        //filling featured properties
        this.setElement(data.element)
        this.setHeader(data.header)
        this.setHeaderClass(data.headerClass)
        this.attribute = data.attribute
        this.data = data.data
        //header
        this.addHeader()
        //table
        this._table = this.createTable()
        //table header
        this.addTableHeader(this._table)
        //table props
        this.addTableProps(this._table)

        document.querySelector(this._element).append(this._table)
    }

    addHeader() {
        if (this._header) {
            const header = document.createElement('h1')
            header.textContent = this._header
            this._headerClass.forEach(cssClass => {
                header.classList.add(cssClass)
            })
            document.querySelector(this._element).append(header)
        }
    }

    createTable() {
        const table = document.createElement('table')
        this._tableClass.forEach(cssClass => {
            table.classList.add(cssClass)
        })
        return table
    }

    addTableHeader(table) {
        let trHeader = document.createElement('tr')
        for (let key in this.attribute) {
            let th = document.createElement('th')
            if (this.attribute[key].label) {
                th.textContent = this.attribute[key].label
            } else {
                th.textContent = key
            }
            trHeader.append(th)
        }
        table.append(trHeader)
    }

    addTableProps(table) {
        for (let i = 0; i < this.data.length; i++) {
            let dataArr = this.data[i]
            let tr = document.createElement('tr')
            for (let key in this.attribute) {
                let td = document.createElement('td')
                let value = dataArr[key]
                //function value?
                if (this.attribute[key].value) {
                    value = this.attribute[key].value(dataArr)
                }
                //src attribute?
                if (this.attribute[key].src) {
                    td.innerHTML = value
                } else {
                    td.textContent = value
                }
                tr.append(td)
            }
            table.append(tr)
        }
    }
}