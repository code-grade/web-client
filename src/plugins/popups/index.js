import {default as PopupManager} from "./PopupManager";

export const PopupManagerPlugin = {
    install(Vue, settings = {}) {
        let Constructor = Vue.extend(PopupManager);
        let PopupManagerContainer = new Constructor(
            {vuetify: settings.vuetify}
        );

        if (settings.router) {
            Vue.prototype.$pRouter = settings.router;
        }
        const vm = PopupManagerContainer.$mount();

        document.querySelector("body").appendChild(vm.$el);
        if (typeof window !== "undefined" && window.Vue) {
            window.Vue.use(PopupManagerContainer);
        }

        /**
         * Open popup
         * @type {{
         *          info: (function({text: string, title: string, ok: string}): Promise<*>)
         *          error: (function({text: string, title: string, ok: string}): Promise<*>)
         *          warn: (function({text: string, title: string, ok: string}): Promise<*>)
         *       }}
         */
        Vue.prototype.$pop = {
            info: vm.info,
            error: vm.error,
            warn: vm.warn,
            addCity: vm.addCity
        }
    }
};

export default PopupManagerPlugin;