import { defineStore } from 'pinia';
import type { SessionType } from '~/types/api/SessionType';
import axios from '~/axios';

const useUserStore = defineStore("user", {
    state: () => ({
        ozonKeys: {
            apiKey: "",
            clientId: "",
        },
        wbKeys: {
            headerApiKey: "",
        },
        status: {
            loading: true,
            error: false,
        },
    }),
    actions: {
        async fetchOzon() {

            if (this.ozonKeys) {
                return;
            }

            try {
                this.status.loading = true;

                const res = await axios(`/ozon`);

                if (!res) {
                    throw Error();
                }

                this.ozonKeys = res;

                this.status.error = false;
            } catch (error) {
                this.status.error = true;
            } finally {
                this.status.loading = false;
            }

        },
        async login(email: string, password: string) {

            if (!email|| !password) {
                return;
            }

            try {
                const res = await axios.post(`/auth/sign-in`, {
                    email,
                    password
                });

                if (res.status !== 200) {
                    throw Error();
                }

                await this.fetchUser();

            } catch (error) {
                
            }
        },
        async logout() {
            try {
                const res = await axios.post(`/auth/sign-out`);

                if (res.status !== 200) {
                    return;
                }

                this.user = null;
 
                return true;

            } catch (error) {
                
            }
        }
    },
});

export default useUserStore;