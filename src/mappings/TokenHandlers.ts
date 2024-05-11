// SPDX-License-Identifier: Apache-2.0
import {Transfer} from "../types";

// Auto-generated
import {TransferTransaction,TransferLog,} from "../types/abi-interfaces/Token";


export async function handleTransferTokenTx(tx: TransferTransaction ): Promise<void> {
// Place your code logic here
}

export async function handleTransferTokenLog(log: TransferLog ): Promise<void> {
    logger.info(`New transfer Transfer log at block ${log.blockNumber}`);
	const transfer = Transfer.create({
		id: log.transactionHash,
		blockHeight: BigInt(log.blockNumber.toString()),
		contractAddress: log.address,
		from: log.args!._from,		
		to: log.args!._to,
		value: BigInt(log.args!._value.toString()),
	});

	await transfer.save();
}
