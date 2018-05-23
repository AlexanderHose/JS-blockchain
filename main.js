"use strict";

var blockchain_index = -1;
//Defince blockchain block
  class Block {
    constructor(index, timeStamp, blockData, previousHash, currentHash) {
      this.index = index;
      this.timeStamp = timeStamp;
      this.blockData = blockData;
      this.previousHash = previousHash.toString();
      this.currentHash = currentHash.toString();
    }
  }

  //Create genesis block
  var genesis_block = () => {
    return new Block(0, 839930, "I am the genesis block", "0", "0");
  };

  var blockchain = [genesis_block()];

  function get_last_block () {
    return blockchain[blockchain.length - 1];
  }

  function hash_data (index, timeStamp, blockData, previousHash){
    return (index + "|" + timeStamp + "|" + blockData + "|" +  previousHash);
  }

  function addBlockToBlockchain (){
    var previousBlock = get_last_block();
    var nextIndex = previousBlock.index + 1;
    var nextTimeStamp = new Date().getTime();
    var nextHash = hash_data(nextIndex, nextTimeStamp, document.getElementById("msg").value, previousBlock.blockData);
    return new Block (nextIndex, nextTimeStamp, document.getElementById("msg").value, previousBlock.currentHash, nextHash);
  }

  function addNextBlockToBlockchain (newBlock){
    if(checkValidity(newBlock, get_last_block())){
      blockchain.push(newBlock);
    }
  }

  function checkValidity(newBlock, lastBlock){
    if (newBlock.previousHash !== lastBlock.currentHash){
      return false
    }
    return true;
  }

  function showBlockchain(){
    var firstBlock = blockchain_index;
    var thirdBlock = blockchain_index+2;
    var secondBlock = blockchain_index+1;

    try{
      document.getElementById("secondBlock").innerHTML = "<span class='badge'>Block " + secondBlock + "</span>" + "<p>Data: " + blockchain[secondBlock].blockData + "</p><p class='bg-success'>Hash: " + blockchain[secondBlock].currentHash + "</p><p class='bg-info'>Previous Hash: " + blockchain[secondBlock].previousHash + "</p>";
      document.getElementById("thirdBlock").innerHTML = "<span class='badge'>Block " + thirdBlock + "</span>" + "<p>Data: " + blockchain[thirdBlock].blockData + "</p><p>Hash: " + blockchain[thirdBlock].currentHash + "</p><p class='bg-success'>Previous Hash: " + blockchain[thirdBlock].previousHash + "</p>";
      document.getElementById("firstBlock").innerHTML = "<span class='badge'>Block " + firstBlock + "</span>" + "<p>Data: " + blockchain[firstBlock].blockData + "</p><p class='bg-info'>Hash: " + blockchain[firstBlock].currentHash + "</p><p>Previous Hash: " + blockchain[firstBlock].previousHash + "</p>";
    }catch(err){
    }
  }

  function minusBlockchain (){
    if(blockchain_index >= 1){
      blockchain_index--;
    }
    showBlockchain();
  }

  function plusBlockchain (){
    if(blockchain_index+4 <= blockchain.length){
      blockchain_index++;
    }
    showBlockchain();
  }

  function submitNewBlock(){
    addNextBlockToBlockchain(addBlockToBlockchain());
  }