import crypto from "crypto";

const SHA256_LENGTH = 64;

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
    if (!Block.validateBlock(this)) {
      console.log("Creating:", "block is not valid.", this);
    }
  }

  static calculateHash(prevHash: string, height: number, data: string): string {
    const toBeHashed = [prevHash, height, data].join("");
    return crypto.createHash("sha256").update(toBeHashed).digest("hex");
  }

  static validateBlock(block: Block): boolean {
    return (
      typeof block.hash === "string" &&
      block.hash.length === SHA256_LENGTH &&
      typeof block.prevHash === "string" &&
      (block.prevHash.length === SHA256_LENGTH || block.prevHash.length === 0) &&
      typeof block.height === "number" &&
      typeof block.data === "string"
    );
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

  public getLatestBlock(): Block | undefined {
    return this.blocks.at(-1);
  }

  public isBlockValid(candidate: Block, previous: Block): boolean {
    if (!Block.validateBlock(candidate)) {
      return false;
    } else if (candidate.height !== previous.height + 1) {
      return false;
    } else if (candidate.prevHash !== previous.hash) {
      return false;
    } else if (
      Block.calculateHash(candidate.prevHash, candidate.height, candidate.data) !== candidate.hash
    ) {
      return false;
    } else {
      return true;
    }
  }

  public addBlock(data: string) {
    const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    const latest = this.getLatestBlock();

    if (latest) {
      if (this.isBlockValid(block, latest)) {
        this.blocks.push(block);
      } else {
        console.log("Pushing:", "block is not valid.", block);
      }
    } else {
      if (Block.validateBlock(block)) {
        this.blocks.push(block);
      } else {
        console.log("Pushing", "block is not valid.", block);
      }
    }
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
