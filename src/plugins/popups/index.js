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
         * Open Popup
         * @type {{warn, error, addCity: ((function({district: *, city: *}): (Promise|Promise<*>))|*), info}}
         */
        Vue.prototype.$pop = {
            info: vm.info,
            error: vm.error,
            warn: vm.warn
        }
    }
};

export default PopupManagerPlugin;