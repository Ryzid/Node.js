const cheerio = require('cheerio');



var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Http = new XMLHttpRequest();
const readline = require('readline');

function ParsePage(raw){
    const $ = cheerio.load(raw);

    $("h3")

    console.log($.html());
};

class Search{
    constructor(){
        this.SearchTerms;
        this.TextToFind;
        this.CreateDefaultKeywords;
        this.MaxResults;

        this.IsReceiving;
        this.LastReceived;
    }
    Parse(Text,Old,New){
        var array = [];
        var response = Text;
        if (response.includes(Old)){ // || !(response.substring(response.length()) == Old)
            do {
                response = response.replace(Old,New);
                //console.log(response);
            } while (response.includes(Old));
        } else {
            return Text;
        }
        return response;
    }
    OpenScraper(){
        var clear = console.clear;
        var cout = function(Text){ console.log(Text+"\n");};
        clear();
        cout("Welcome to Search Scraper.");
        var uInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        uInterface.question("Enter Search Terms ( Seperated by space or / ): ", (response) => {
            this.SearchTerms = this.Parse(response," ","+");
            console.log(this);
            uInterface.close();
            /*uInterface.question("Enter Words to Find: ", (response) => {
                this.TextToFind = response;
                uInterface.close();
                //console.log(this);
            })*/
            var Data = "";
            const url = "https://www.google.com/search?q="+this.SearchTerms;
            console.log(url);
            Http.open("GET",url);
            Http.send();
            Http.onreadystatechange = (Input)=>{
                Data = Data + Http.responseText;//console.log(Http.responseText);
            };
            Http.onload = (Input)=>{
                ParsePage(Data);
            }
        });
    }
}

var Scrape = new Search();
Scrape.OpenScraper();



//var Scrapper = OpenScraper();


/*


function DBounce(){
    if (!IsSearching){
        return true;
    }
}

function RunOnce(){
    var searchTerm,textToFind;

}


class Console{
    constructor(){
        this.Holster = "";
    }
    async CaptureText(prompt){
        var tInterface = readline.createInterface({
            input: process.stdin,
            output:process.stdout
        });
        var respons;
        tInterface.question(prompt, (response) => {
            respons = response;
            console.log(respons + " - And we out");
            tInterface.close();
            return respons;
        });
        /*do {
            setTimeout(function(){},1000);
        } while (!response);
        return new Promise((resolve)=>{
            if (typeof(respons) != "undefined"){
                resolve(respons);
            }
        });
        //response;
    }
}

async function Main(){
    var Input = new Console();
    var Ye = await Input.CaptureText("How r u? ");
    console.log(Ye);
}
Main();
*/