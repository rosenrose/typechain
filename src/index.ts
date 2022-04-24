const hello = () => "hi";
function hi() {
  return "hello";
}

class Hello {
  constructor(private data: string) {}
  static hi() {
    return "hi";
  }
}

const a = [1, 2, 3];
const b = [...a, 4 ** 5];
const c = 1_000_000;

// import { init, exit } from "myPackage"; // from package
// init({ url: "" });
// exit(1);

// import { init2, exit2 } from "./myPackage2"; // from file
// init2({ url: "" });
// exit2(1);

import crypto from "crypto";

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public readonly hash: string;

  constructor(
    public readonly prevHash: string,
    public readonly height: number,
    public readonly data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }

  static calculateHash(prevHash: string, height: number, data: string): string {
    const toBeHashed = [prevHash, height, data].join("");
    return crypto.createHash("sha256").update(toBeHashed).digest("hex");
  }
}

class BlockChain {
  private blocks: Block[];

  constructor() {
    this.blocks = [];
  }

  private getPrevHash(): string {
    if (this.blocks.length) {
      return this.blocks.at(-1)!.hash;
    } else {
      return "";
    }
  }
  public addBlock(data: string) {
    const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(block);
  }
  public getBlocks() {
    return [...this.blocks];
  }
}

const blockchain = new BlockChain();

blockchain.addBlock("first");
blockchain.addBlock("second");
blockchain.addBlock("3");

blockchain.getBlocks().push(new Block("xxxx", 1234, "hackedddd"));
blockchain.addBlock("4");

console.log(blockchain.getBlocks());
