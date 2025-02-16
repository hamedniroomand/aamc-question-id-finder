import { mount } from "svelte";
import QuestionWindow from "./lib/QuestionWindow.svelte";

const wrapperId = 'aamc-question-id-finder';

const removeComponent = () => {
    const wrapper = document.getElementById(wrapperId);
    if (wrapper) {
        wrapper.remove();
    }
}

const initialWrapper = () => {
    if (document.getElementById(wrapperId)) {
        document.body.removeChild(document.getElementById(wrapperId)!);
    }
    const wrapper = document.createElement('div');
    wrapper.id = wrapperId;
    document.body.appendChild(wrapper);
    return wrapper;
}

const target = initialWrapper(); 

mount(QuestionWindow, {
    target,
    props: {
        removeComponent,
    }
});
