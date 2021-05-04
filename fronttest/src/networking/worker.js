import axios from "axios";
import { showErrorMessage } from "@/messaging";
import store from "@/store";

const baseUrl = "https://localhost:7443";

export default {
    async getWorkersList() {
        try {
            let workers = (await axios.get(`${baseUrl}/api/worker`)).data;
            return workers;
        } catch (err) {
            showErrorMessage(err)
            return [];
        }
    },

    async deleteBWorker(id) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let deletedWorker = (
                await axios.delete(
                    `${baseUrl}/api/worker/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data;
            return deletedWorker;
        }
        catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async postWorker(worker) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let newWorker = (await axios.post(
                `${baseUrl}/api/worker`,
                worker,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )).data;
            return newWorker;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async getWorkerById(id) {
        try {
            let worker = (await axios.get(`${baseUrl}/api/worker/${id}`)).data;
            return worker;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    },

    async patchWorker(worker, id) {
        try {
            const token = store.getters.token;
            if (!token)
                return null;
            let updatedWorker = (
                await axios.patch(
                    `${baseUrl}/api/worker/${id}`,
                    worker,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            ).data;
            return updatedWorker;
        } catch (err) {
            showErrorMessage(err);
            return null;
        }
    }
}