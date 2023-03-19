(function(){
    angular.module("ShoppingList", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .provider("DbService", DbServiceProvider)
    .config(Config)


    ToBuyController.$inject = ["DbService"]
    function ToBuyController(DbService){
        this.isEmpty = () => DbService.buyTable.count() <= 0 ? true : false;
        this.getData = () => DbService.buyTable.getAllData();
        this.buy = name => {
            const goods = DbService.buyTable.get(name);
            DbService.buyTable.remove(goods);
            DbService.boughtTable.add(goods);
        }
    }

    ToBuyController.$inject = ["DbService"]
    function AlreadyBoughtController(DbService){
        this.isEmpty = () => DbService.boughtTable.count() <= 0 ? true : false;
        this.getData = () => DbService.boughtTable.getAllData();
    }

    function TableService(initial){
        this.data = [...initial];
        this.getAllData = () => this.data;
        this.add = item => this.data.push(item);
        this.remove = item => this.data.splice(this.data.indexOf(item), 1)
        this.get = name => this.data.find(e => e.name == name);
        this.count = () => this.data.length;

    }

    function DbService(buyTable, boughtTable){
        this.buyTable = buyTable;
        this.boughtTable = boughtTable;
    }

    function DbServiceProvider(){
        this.tables = {
            buyTableItems: [],
            boughtTableItems: []
        }

        this.$get = () => {
            return new DbService(
                new TableService(this.tables.buyTableItems),
                new TableService(this.tables.boughtTableItems)
                );
        }
    
    }

    Config.$inject = ["DbServiceProvider"]
    function Config(DbServiceProvider){
        DbServiceProvider.tables.buyTableItems.push(
            {
                name: "cookies",
                quantity: 10
            },{
                name: "bacon",
                quantity: 4
            },{
                name: "cheese",
                quantity: 7
            },{
                name: "eggs",
                quantity: 2
            },{
                name: "cherry",
                quantity: 38
            }
        )
    }
})()