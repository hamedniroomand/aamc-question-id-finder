import { mount } from "svelte";
import QuestionWindow from "./lib/QuestionWindow.svelte";

const removeBadge = () => {
    const wrapper = document.getElementById('aamc-question-id-finder');
    if (wrapper) {
        wrapper.remove();
    }
}

const initialWrapper = () => {
    const wrapperId = 'aamc-question-id-finder';
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
        removeComponent: () => removeBadge(),
    }
});
