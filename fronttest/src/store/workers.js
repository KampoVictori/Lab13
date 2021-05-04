import networking from "../networking";

export default {
    state: {
        workers: [],
    },
    getters: {
        workers(state) {
            return state.workers;
        }
    },
    mutations: {
        setWorkers(state, workers) {
            state.workers = workers;
        },
        addWorker(state, worker) {
            state.workers.push(worker);
        },
        updateWorker({ workers }, worker) {
            const index = workers.findIndex(b => b._id === worker._id);
            if (index >= 0)
            workers.splice(index, 1, worker);
        },
        removeWorker({ workers }, worker) {
            const index = workers.findIndex(b => b._id === worker._id);
            if (index >= 0)
            workers.splice(index, 1);
        }
    },
    actions: {
        async loadWorkers({ commit }) {
            const workers = await networking.getWorkersList();
            commit("setWorkers", workers);
        },
        async addWorker({ commit }, worker) {
            let newWorker = await networking.postWorker(worker);
            if (!newWorker)
                return null;
            commit("addWorker", newWorker);
            return newWorker;
        },
        async updateWorker({ commit }, worker) {
            let updatedWorker = await networking.patchWorker(worker, worker._id);
            if (!updatedWorker)
                return null;
            commit("updateWorker", updatedWorker);
            return updatedWorker;
        },
        async deleteWorkerById({ commit }, id) {
            let deletedWorker = await networking.deleteWorker(id);
            if (!deletedWorker)
                return null;
            commit("removeWorker", deletedWorker);
            return deletedWorker;
        },
    }
}