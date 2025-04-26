let bella_img = document.querySelector(".bella");
let down_arrow_img = document.querySelector(".down_arrow");
let move_div = document.querySelector(".move_div");
let set_bella_position_flag = false;
let set_down_arrow_position_flag = false;
// let set_bella_animation_flag = false;

let bella_img_global_x = bella_img.left;
let bella_img_global_y = bella_img.top;

document.querySelector("#move_button").addEventListener("click", function() {
    if(this.classList.contains("active") ) {
        this.classList.remove("active");
        move_div.style.display = "none"; 
    
    } else {
        this.classList.add("active");
        move_div.style.display = "inline";
    }
});

document.querySelector("#move_init_pos").addEventListener("click", function() {
    if(this.classList.contains("active") ) {
        this.classList.remove("active");
        set_bella_position_flag = false;
    } else {
        this.classList.add("active");
        set_bella_position_flag = true;
    }
});

document.addEventListener("click", function(event) {
    if (!set_bella_position_flag) {
        return;
    }
    if (event.target.closest(".animation_controls")) {
        return;
    }

    let parent_rect = bella_img.offsetParent.getBoundingClientRect();
    let image_width = bella_img.offsetWidth;
    let image_height = bella_img.offsetHeight;

    let x_pos = event.clientX - parent_rect.left - (image_width / 2);
    let y_pos = event.clientY - parent_rect.top - (image_height / 2);
    
    bella_img.style.left = `${x_pos}px`;
    bella_img.style.top = `${y_pos}px`;
    bella_img_global_x = x_pos;
    bella_img_global_y = y_pos;

    set_bella_position_flag = false;
    document.querySelector("#move_init_pos").classList.remove("active");
});

document.querySelector("#move_end_pos").addEventListener("click", function() {
    if(this.classList.contains("active") ) {
        this.classList.remove("active");
        set_down_arrow_position_flag = false;
    
    } else {
        this.classList.add("active");
        set_down_arrow_position_flag = true;
    }
});

document.addEventListener("click", function(event) {
    if (!set_down_arrow_position_flag) {
        return;
    }
    if (event.target.closest(".animation_controls")) {
        return;
    }
    let parent_rect = bella_img.offsetParent.getBoundingClientRect();
    let image_width = down_arrow_img.offsetWidth;
    let image_height = down_arrow_img.offsetHeight;

    let x_pos = event.clientX - parent_rect.left - (image_width / 2);
    let y_pos = event.clientY - parent_rect.top - (image_height);

    down_arrow_img.style.left = `${x_pos}px`;
    down_arrow_img.style.top = `${y_pos}px`;
    set_down_arrow_position_flag = false;
    document.querySelector("#move_end_pos").classList.remove("active");
});

function animate_bella_movement() {
    // let parent_rect = bella_img.offsetParent.getBoundingClientRect();
    // let bella_rect = bella_img.getBoundingClientRect();
    // let arrow_rect = down_arrow_img.getBoundingClientRect();

    // let start_x = bella_rect.left - parent_rect.left;
    // let start_y = bella_rect.top - parent_rect.top;
    // let end_x = arrow_rect.left - parent_rect.left;
    // let end_y = (arrow_rect.top + down_arrow_img.height) - parent_rect.top;

    let start_x = bella_img.offsetLeft;
    let start_y = bella_img.offsetTop;
    let end_x = down_arrow_img.offsetLeft + (down_arrow_img.offsetWidth / 2) - (bella_img.offsetWidth / 2);
    let end_y = down_arrow_img.offsetTop + down_arrow_img.offsetHeight - (bella_img.offsetHeight / 2);
    let animation_name = "move_bella";
    let styleSheet = document.styleSheets[1];
    for (let i = 0; i < styleSheet.cssRules.length; ++i) {
        if (styleSheet.cssRules[i].name === animation_name) {
            styleSheet.deleteRule(i);
        }
    }
    styleSheet.insertRule(`
        @keyframes ${animation_name} {
            from {
                left: ${start_x}px;
                top: ${start_y}px;
            }
            to {
                left: ${end_x}px;
                top: ${end_y}px;
            }
        }
    `, styleSheet.cssRules.length);
};

document.querySelector("#animate_bella").addEventListener("click", function() {
    // if (set_bella_animation_flag) {
    //     return;
    // }
    set_bella_animation_flag = true;
    animate_bella_movement();
    let move_duration = document.querySelector("#animation_duration").value;
    let move_direction = document.querySelector("#animation_direction").value;
    let move_timing = document.querySelector("#animation_timing").value;
    let move_repeat = document.querySelector("#repeat_animation").checked;

    bella_img.style.animation = "none";
    void bella_img.offsetWidth;

    bella_img.style.animation = `move_bella ${move_duration}s ${move_timing} ${move_repeat ? "infinite" : "1"} ${move_direction} forwards`;
});

bella_img.addEventListener("animationend", function() {
    bella_img.style.left = `${bella_img_global_x}px`;
    bella_img.style.top = `${bella_img_global_y}px`;
    bella_img.style.animation = "none";
    // set_bella_animation_flag = false;
});