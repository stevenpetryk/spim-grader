#include "project.c"

int testIndex = 0;
char** messages;

void assertEquals_special (const char * callerName, const char * message, unsigned a, unsigned b) {
	messages[testIndex] = malloc(sizeof(char) * 500);

	sprintf(
		messages[testIndex],
		"%s %d %s: %s",
		a == b ? "ok" : "not ok", testIndex + 1, callerName, message
	);

	testIndex++;
}

#define assertEquals(message, a, b) assertEquals_special(__FUNCTION__, message, a, b)

void instructionFetchTest () {
	unsigned memory[] = { 0, 1, 2, 3 };
	unsigned instruction = -1;
	unsigned pc = 12;

	int result = instruction_fetch(3, memory, &instruction);
	assertEquals("Should halt on non-word-aligned PC value", result, 1);

	result = instruction_fetch(pc, memory, &instruction);
	assertEquals("Should not halt on word-aligned value", result, 0);
	assertEquals("Should fetch PC value from memory", instruction, memory[pc / 4]);
}

void instructionPartitionTest () {
	unsigned rType = 0b10000110001100111011110001100001;

	unsigned op = 0, r1 = 0, r2 = 0, r3 = 0, funct = 0, offset = 0, jsec = 0;

	instruction_partition(rType, &op, &r1, &r2, &r3, &funct, &offset, &jsec);
	assertEquals("Should extract op", op, 0b100001);
	assertEquals("Should extract rs", r1, 0b10001);
	assertEquals("Should extract rt", r2, 0b10011);
	assertEquals("Should extract rd", r3, 0b10111);
	assertEquals("Should extract funct", funct, 0b100001);
	assertEquals("Should extract offset", offset, 0b1011110001100001);
	assertEquals("Should extract jsec", jsec, 0b10001100111011110001100001);
}

void signExtendTest () {
	unsigned positiveOffset = 0b00000000000000000111111111111111;
	unsigned expectedPositive = 0b00000000000000000111111111111111;

	unsigned negativeOffset = 0b00000000000000001111111111111111;
	unsigned expectedNegative = 0b11111111111111111111111111111111;

	sign_extend(positiveOffset, &positiveOffset);
	sign_extend(negativeOffset, &negativeOffset);

	assertEquals("Shouldn't extend zeroes for positive value", positiveOffset, expectedPositive);
	assertEquals("Should extend with ones for negative values", negativeOffset, expectedNegative);
}

void writeRegisterTest () {
	unsigned r2 = 2;
	unsigned r3 = 3;
	unsigned registerFile[] = { 1, 2, 3, 4, 5 };

	int memData = 50;
	int aluResult = 75;

	write_register(0, 0, memData, aluResult, 0, 0, 0, registerFile);
	assertEquals("Register shouldn't be modified when RegWrite is deasserted", registerFile[0], 1);

	write_register(r2, r3, memData, aluResult, 1, 0, 0, registerFile);
	assertEquals("Should write ALUresult -> rs when appropriate", registerFile[r2], aluResult);

	write_register(r2, r3, memData, aluResult, 1, 0, 1, registerFile);
	assertEquals("Should write memdata -> rs when appropriate", registerFile[r2], memData);

	write_register(r2, r3, memData, aluResult, 1, 1, 0, registerFile);
	assertEquals("Should write ALUresult -> rt when appropriate", registerFile[r3], aluResult);

	write_register(r2, r3, memData, aluResult, 1, 1, 1, registerFile);
	assertEquals("Should write memdata -> rt when appropriate", registerFile[r3], memData);
}

void pcUpdateTest () {
	unsigned pc = 4000;

	PC_update(0, 0, 0, 0, 0, &pc);
	assertEquals("Should increment PC by 4", pc, 4004);

	pc = 4000;
	PC_update(0, 3, 1, 0, 1, &pc);
	assertEquals("Should use PC-relative addressing when branching", pc, 4016);

	pc = 4000;
	PC_update(0, 3, 1, 0, 0, &pc);
	assertEquals("Should use normal addressing when branch isn't taken", pc, 4004);

	pc = 0b11110000000000000000000000000000;
	unsigned jsec = 0b00000000000000001111111111;
	unsigned expected = 0b11110000000000000000111111111100;

	PC_update(jsec, 0, 0, 1, 0, &pc);
	assertEquals("Should use pseudo-direct addressing when jumping", pc, expected);
}

int main () {
	messages = malloc(sizeof(char*) * 100);

	instructionFetchTest();
	instructionPartitionTest();
	signExtendTest();
	writeRegisterTest();
	pcUpdateTest();

	printf("1..%d\n", testIndex);

	for (int i = 0; i < testIndex; i++) {
		printf("%s\n", messages[i]);
	}

	return 0;
}
