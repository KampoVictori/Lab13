import { createStore, createLogger } from 'vuex';
import message from "./message";
import auth from "./auth";
import workers from "./workers";

const store = createStore({
    plugins: [createLogger()],
    modules: {
        message,
        auth,
        workers
    },
});

export default store;