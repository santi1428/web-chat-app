import { store } from 'react-notifications-component';
// import MyNotification from './MyNotification/MyNotification';


const showSuccessNotification = (title, message) => {
    store.addNotification({
        // content: MyNotification({backgroundColor: "bg-succes", title: "OK", body: "Your profile has been updated"}),
        title,
        message, 
        type: "success",
        insert: "bottom",
        icon: "success",
        container: "bottom-left",
        animationIn: ["animated", "fadeInLeft"],
        animationOut: ["animated", "fadeOutLeft"],
        isMobile: true,
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true,
            waitForAnimation: true,
            showIcon: true	
        }
    });
}

const showDangerNotification = (title, message) => {
    store.addNotification({
        title,
        message,
        type: "danger",
        insert: "bottom",
        container: "bottom-left",
        animationIn: ["animated", "fadeInLeft"],
        animationOut: ["animated", "fadeOutLeft"],
        isMobile: true,
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true,
        }
    });
}

const showWarningNotification = (title, message) => {
    store.addNotification({
        title,
        message,
        type: "warning",
        insert: "bottom",
        container: "bottom-left",
        animationIn: ["animated", "fadeInLeft"],
        animationOut: ["animated", "fadeOutLeft"],
        isMobile: true,
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true,
        }
    });
}

const showMessageNotification = (user, message) => {
    store.addNotification({
        title: user,
        message,
        type: "info",
        insert: "bottom",
        container: "top-right",
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        isMobile: true,
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true,
        }
    });
}


const showMutedNotification = (title, message) => {
    store.addNotification({
        title,
        message,
        type: "info",
        insert: "bottom",
        container: "top-right",
        animationIn: ["animated", "fadeInRight"],
        animationOut: ["animated", "fadeOutRight"],
        isMobile: true,
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true,
        }
    });
}

export {
    showSuccessNotification,
    showDangerNotification,
    showWarningNotification,
    showMessageNotification,
    showMutedNotification
}