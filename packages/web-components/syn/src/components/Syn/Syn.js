"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Syn;
const SynContainer_1 = __importDefault(require("./SynContainer/SynContainer"));
const SynHeader_1 = __importDefault(require("./SynHeader/SynHeader"));
const useSyn_1 = __importDefault(require("./useSyn"));
const SynConversation_1 = __importDefault(require("./SynConversation/SynConversation"));
const SynAsk_1 = __importDefault(require("./SynAsk/SynAsk"));
const SynError_1 = __importDefault(require("./SynError/SynError"));
function Syn() {
    const { messages, isPending, error, askQuestion, question, setQuestion, over18, setOver18, } = (0, useSyn_1.default)();
    return (<SynContainer_1.default>
			<SynHeader_1.default />
			<SynConversation_1.default messages={messages}/>
			<SynAsk_1.default loading={isPending} askQuestion={askQuestion} question={question} setQuestion={setQuestion} over18={over18} setOver18={setOver18}/>
			<SynError_1.default error={error}/>
		</SynContainer_1.default>);
}
