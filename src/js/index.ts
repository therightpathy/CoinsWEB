import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

interface ICoin {
    id_ : number
    type : string
    bid : number
    name : string
}

let btnelement: HTMLButtonElement = <HTMLButtonElement> document.getElementById("knap")
let element: HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let inputelement: HTMLInputElement = <HTMLInputElement> document.getElementById("felt")
let btn2element: HTMLButtonElement = <HTMLButtonElement> document.getElementById("activate")
let btn3element: HTMLButtonElement = <HTMLButtonElement> document.getElementById("newBidBtn")
let input2element: HTMLInputElement = <HTMLInputElement> document.getElementById("remove")
let btn4element: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton")
let btn5element: HTMLButtonElement = <HTMLButtonElement> document.getElementById("searchButton")
let input3element: HTMLInputElement = <HTMLInputElement> document.getElementById("search")
let input4element: HTMLInputElement = <HTMLInputElement> document.getElementById("searchBidMin")
let input5element: HTMLInputElement = <HTMLInputElement> document.getElementById("searchBidMax")
let btn6element: HTMLButtonElement = <HTMLButtonElement> document.getElementById("searchButton2")
let btn7element: HTMLButtonElement = <HTMLButtonElement> document.getElementById("updateButton")
let input9element: HTMLInputElement = <HTMLInputElement> document.getElementById("updateId")



btnelement.addEventListener("click", getall)
btn2element.addEventListener("click", getcoinbyid)
btn3element.addEventListener("click", AddCoin)
btn4element.addEventListener("click", RemoveCoin)
btn5element.addEventListener("click", GetCustomerByBids)
btn6element.addEventListener("click", GetCoinsByBid)
btn7element.addEventListener("click", UpdateCoin)




const url:string ="https://coinrestservicepatty.azurewebsites.net/"

function getall (){
axios.get<ICoin[]>(url + "getcoins")
.then(function(response:AxiosResponse):void{
    console.log(response.data)
    let result: string = "<ul>";
        response.data.forEach((c: ICoin) => {
            result += "<li>Id: " + c.id_ + " Type: " + c.type + " Bid: " + c.bid + " Name: "+ c.name + "</li>"
        })
        result + "</ul>"
        element.innerHTML = result;
})
}

function getcoinbyid (){
    axios.get<ICoin>(url + "getcoinbyid/" + inputelement.value)
    .then(function(response:AxiosResponse):void{
        console.log(response.data)
        let c:ICoin = response.data
        let result: string = "<ul>";
            result += "<li>Id: " + c.id_ + " Type: " + c.type + " Bid: " + c.bid + " Name: "+ c.name + "</li>"
        result + "</ul>"
        element.innerHTML = result;
    })
}

function AddCoin (){
    let newid : HTMLInputElement =<HTMLInputElement> document.getElementById("newId")
    let newitem : HTMLInputElement =<HTMLInputElement> document.getElementById("newItem")
    let newbid : HTMLInputElement =<HTMLInputElement> document.getElementById("newBid")
    let newname : HTMLInputElement =<HTMLInputElement> document.getElementById("newName")

    axios.post<ICoin>(url + "AddCoin", {
        id_ : newid.value,
        type : newitem.value,
        bid : newbid.value,
        name : newname.value
    })
    .then((response: AxiosResponse) => {
        let message: string = "response " + response.status + " " + response.statusText;
        element.innerHTML = message;
    })
    .catch(function (error: AxiosError): void {
        element.innerHTML = error.message
    })
}

function RemoveCoin (){
    axios.delete(url + "removecoin/" + input2element.value)
    .then((response: AxiosResponse) => {
        let message: string = "response " + response.status + " " + response.statusText;
        element.innerHTML = message;
    })
    .catch((error: AxiosError) => {
        element.innerHTML = error.message;
    })
}

function GetCustomerByBids (){
    axios.get<ICoin[]>(url + "getcustomerbids/" + input3element.value)
    .then(function(response:AxiosResponse):void{
        console.log(response.data)
        let result: string = "<ul>";
            response.data.forEach((c: ICoin) => {
                result += "<li>Id: " + c.id_ + " Type: " + c.type + " Bid: " + c.bid + " Name: "+ c.name + "</li>"
            })
            result + "</ul>"
            element.innerHTML = result;
    })
    }

    function GetCoinsByBid(){
        axios.get < ICoin[] > (url + "GetCoinsByBid?MinBid=" + input4element.value + "&MaxBid=" + input5element.value)
        .then(function (response: AxiosResponse < ICoin[] > ): void {
            let result: string = "<ul>";
            response.data.forEach((c: ICoin) => {
                result += "<li>" + c.id_ + " " + c.type + " " + c.bid + " " + c.name + "</li>"
            })
            result + "</ul>"
            element.innerHTML = result
        })
        .catch(function (error: AxiosError): void {
            element.innerHTML = error.message
        })
    }

    function UpdateCoin(){

        let updateItem : HTMLInputElement =<HTMLInputElement> document.getElementById("updateType")
        let updateBid : HTMLInputElement =<HTMLInputElement> document.getElementById("updateBid")
        let updateName : HTMLInputElement =<HTMLInputElement> document.getElementById("updateName")

        axios.put (url + "UpdateCoin/" + input9element.value, {
                id_ : input9element.value,
                type : updateItem.value,
                bid : updateBid.value,
                name : updateName.value
        })
        .then(function (response: AxiosResponse): void {
            let message: string = "response " + response.status + " " + response.statusText;
            element.innerHTML = message;
        })
        .catch((error: AxiosError) => {
            element.innerHTML = error.message;
        })    
    }