//esup
//Learn the Blockchain technology
const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.data=data;
        this.index=index;
        this.timestamp=timestamp;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce= 0;
    }
    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }

    mineBlock(difficulty){
        while(this.hash.substring (0,difficulty) !== Array(difficulty + 1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
    }
    console.log("Block mined: " + this.hash);
    }
}


class Blockchain{
    constructor(){
        this.chain = [this.createGenisisBlock()];
        this.difficulty = 0;
    }
    createGenisisBlock(){
        return new Block(0, "01/01/2017", "Genesis Block", "0")
    }
    getLatestBLock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBLock().hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainVaild(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
     
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                 return false;
            }
            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let esupcoin = new Blockchain();

console.log('Mining Block 1...');
esupcoin.addBlock(new Block(1, "10/07/2017",{amount: 4}));
esupcoin.addBlock(new Block(2, "10/09/2017",{amount: 10}));