const chai = require('chai');
const assert = chai.assert;
const {Builder, By, Key} = require("selenium-webdriver");
let driver = new Builder().forBrowser("chrome").build();


suite('Smoke Test', async function(){
	test('Search bar works', async function(){
		await homePage(homepage);
		await driver
			.findElement(By.xpath(searchBar))
			.sendKeys(searchData1,Key.ENTER);
		currentAdress=await driver.getCurrentUrl();
		expectedAdress="https://www.navigator.ba/#/search/"+searchData1;
		await assert.equal(expectedAdress,currentAdress);//Expected result page should load
		await loadPage(expectedAdress);
		let pContent=await driver.findElement(By.xpath(fistListItem)).getAttribute("title");
		assert.include(pContent,searchData1);//Search bar shows adequate results
	});
});

//variables--------------------------------------------------------------------
const homepage = "https://navigator.ba";
const menuURLs = ['sarajevska-pozorista','nextbike','smoke-free-public-places','accommodation','coffee','food','nightlife','shopping','attractions','art','sport','transport','services','business','street'];
const searchData1 = "Bingo";
//selectors--------------------------------------------------------------------
const searchBar = "//div[@id='header_search']//input[@class='ember-view ember-text-field tt-query']";
const fistListItem = "//ul//li//div[@class='name']";
//functions--------------------------------------------------------------------
function loadPage(pageURL){driver.get(pageURL);}
function homePage(){driver.get(homepage);}
function textBoxContent(boxXPath){
	let boxContent= driver.findElement(By.xpath(boxXPath)).getText().then((value)=>{return value;});
	return boxContent;
}
