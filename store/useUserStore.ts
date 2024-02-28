import { defineStore } from 'pinia';
import type { SessionType } from '~/types/api/SessionType';
import axios from '~/axios';

const useUserStore = defineStore("user", {
    state: () => ({
        user: null as SessionType | null,
        status: {
            loading: true,
            error: false,
        },
    }),
    actions: {
        async fetchUser() {

            if (this.user) {
                return;
            }

            try {
                this.status.loading = true;

                const res = await axios<SessionType>(`/auth/session`, {
                    withCredentials: true,
                });

                if (!res.data) {
                    throw Error();
                }

                this.user = res.data;

                this.status.error = false;
            } catch (error) {
                this.status.error = true;
            } finally {
                this.status.loading = false;
            }

        },
        async register(email: string, password: string) {

            if (!email|| !password) {
                return;
            }

            try {
                const res = await axios.post(`/auth/sign-up`, {
                    email,
                    password
                }, {
                    withCredentials: true,
                });

                if (res.status !== 201) {
                    throw Error();
                }

                await this.fetchUser();

            } catch (error) {
                
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
                }, {
                    withCredentials: true,
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
                const res = await axios.post(`/auth/sign-out`, null, {
                    withCredentials: true,
                });

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