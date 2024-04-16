const area = { 1: "内地", 2: "港台", 3: "欧美", 4: "韩国", 5: "日本" };
const version = {
    1: "MV",
    2: "现场",
    3: "翻唱",
    4: "舞蹈",
    5: "影视",
    6: "综艺",
    7: "儿歌",
};
let areaLinks = document.querySelectorAll("ul.mylist1 li a.area-link");
let versionLinks = document.querySelectorAll("ul.mylist2 li a.version-link");
let selectedArea = "all";
let selectedVersion = "all";

function flashdetails() {
    let targetElement = document.querySelector(".main_content_nav1");
    targetElement.innerHTML = "";

    if (selectedArea === "all" && selectedVersion === "all") {
        let newElement = document.createElement("h2");
        newElement.innerHTML = `全部MV`;
        newElement.setAttribute("class", "select_allmv");
        targetElement.appendChild(newElement);
    } else if (selectedArea !== "all" && selectedVersion === "all") {
        let newElement = document.createElement("span");
        newElement.innerHTML = `${area[selectedArea]}<a href="#" class="close_select_mv_details"></a>`;
        newElement.setAttribute("class", "select_mv_details");
        targetElement.appendChild(newElement);
    } else if (selectedArea === "all" && selectedVersion !== "all") {
        let newElement = document.createElement("span");
        newElement.innerHTML = `${version[selectedVersion]}<a href="#" class="close_select_mv_details"></a> `;
        newElement.setAttribute("class", "select_mv_details");
        targetElement.appendChild(newElement);
    } else if (selectedArea !== "all" && selectedVersion !== "all") {
        let newElement1 = document.createElement("span");
        newElement1.innerHTML = `${area[selectedArea]}<a href="#" class="close_select_mv_details"></a>`;
        newElement1.setAttribute("class", "select_mv_details");
        targetElement.appendChild(newElement1);

        let spaceElement = document.createElement("span");
        spaceElement.innerHTML = ""; // 这可以是任何你想在两个 span 元素间插入的内容
        targetElement.appendChild(spaceElement);

        let newElement2 = document.createElement("span");
        newElement2.innerHTML = `${version[selectedVersion]}<a href="#" class="close_select_mv_details"></a>`;
        newElement2.setAttribute("class", "select_mv_details");
        targetElement.appendChild(newElement2);
    }

    addCloseListeners();
}

function addCloseListeners() {
    const closeDetailsLinks = document.querySelectorAll(".close_select_mv_details");

    closeDetailsLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // 阻止a标签的默认行为
            // 获取 span 元素并删除
            const parentSpan = link.parentNode;
            parentSpan.parentNode.removeChild(parentSpan);
            // 判断要删除的过滤条件（area or version）
            const areaAllLink = document.querySelector("ul.mylist1 li a[data-value='all']");
            const versionAllLink = document.querySelector("ul.mylist2 li a[data-value='all']");
            // 对应的区域或版本条件重置为 'all' 并执行一次 click 事件
            // 这个事件会正确设置 selectedArea 或 selectedVersion 并更新页面
            if (parentSpan.innerText.includes(area[selectedArea])) {
                selectedArea = 'all';
                areaAllLink.click();
            } else {
                selectedVersion = 'all';
                versionAllLink.click();
            }
        });
    });
}


// 遍历每个 area 链接并添加点击事件处理程序
areaLinks.forEach(function (link) {
    // 初始化时调用点击事件处理程序
    if (selectedArea === "all") {
        link.click();
    }
    link.addEventListener("click", function () {
        // 取消所有的样式
        areaLinks.forEach(function (a) {
            a.classList.remove("selected1");
        });
        // 将点击的链接设置为选中样式
        this.classList.add("selected1");
        selectedArea = this.dataset.value; // 记录所选链接的值
        flashdetails(); // 调用 flashdetails 更新内容
        updatePageContent(); // 执行获取数据和更新页面的函数
    });

});




// 遍历每个 version 链接并添加点击事件处理程序
versionLinks.forEach(function (link) {
    // 初始化时调用点击事件处理程序
    if (selectedVersion === "all") {
        link.click();
    }
    link.addEventListener("click", function () {
        // 取消所有的样式
        versionLinks.forEach(function (a) {
            a.classList.remove("selected2");
        });
        // 将点击的链接设置为选中样式
        this.classList.add("selected2");
        selectedVersion = this.dataset.value; // 记录所选链接的值
        flashdetails(); // 调用 flashdetails 更新内容
        updatePageContent(); // 执行获取数据和更新页面的函数
    });
});




// 获取 select_all_3 的 div 元素
let selectAllDiv = document.querySelector(".select_all_3");
// 获取 div 中的最热和最新的 a 元素
let hottestLink = selectAllDiv.querySelector(".hottest");
let newestLink = selectAllDiv.querySelector(".newest");

// 添加点击事件处理程序给最热的 a 元素
hottestLink.addEventListener("click", function () {
    // 清除最新的 a 元素的选中样式
    newestLink.classList.remove("selected3");
    // 给最热的 a 元素添加选中样式
    hottestLink.classList.add("selected3");
    updatePageContent(); // 执行获取数据和更新页面的函数
});

// 添加点击事件处理程序给最新的 a 元素
newestLink.addEventListener("click", function () {
    // 清除最热的 a 元素的选中样式
    hottestLink.classList.remove("selected3");
    // 给最新的 a 元素添加选中样式
    newestLink.classList.add("selected3");
    updatePageContent(); // 执行获取数据和更新页面的函数
});


// 获取JSON文件的指定内容，更新页面元素内容
function updatePageContent() {
    if (selectedArea && selectedVersion) {
        // 创建新的XMLHttpRequest对象
        let xhr = new XMLHttpRequest();
        // 获取歌曲数据的来源JSON文件
        let jsonDataFile = newestLink.classList.contains("selected3")
            ? "new.json"
            : "hot.json";

        // 注册加载完成时的回调函数
        xhr.onload = function () {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                // console.log("Loaded JSON data:", data); // 输出完整的 JSON 数据
                // console.log(data.length);
                // 遍历数据数组，查找匹配的歌曲数据
                let songData = null;
                let targetElement = document.querySelector(".mv_contents");
                targetElement.innerHTML = "";
                for (let i = 0; i < data.length; i++) {
                    if (
                        (selectedArea === "all" && selectedVersion === "all") ||
                        (selectedArea === "all" && data[i].verison === parseInt(selectedVersion)) ||
                        (selectedVersion === "all" && data[i].area === parseInt(selectedArea)) ||
                        (data[i].area === parseInt(selectedArea) && data[i].verison === parseInt(selectedVersion))
                    ) {
                        songData = data[i];
                        // let targetElement = document.querySelector(".mv_contents");
                        let newElement = document.createElement("li");
                        newElement.innerHTML =
                            `<div class="mv_box">
<a href="#" target="_blank" class="mv_a">
<div class="mv_images">
<img src="" alt="" class="mv_img">
<img src="./img/cover_play.png" class="mv_icon_play"></im>
</div>
</a>
<h3 class="mv_singname"><a href="#" target="_blank" class="mv_singname_a"></a></h3>
<p class="mv_singer"><a href="#" target="_blank" class="mv_singer_a"></a></p>
<div class="mv_footer">
<span class="mv_listen"><i class="mv_listen_icon"></i></span>
<span class="click"></span>
<span class="uploaddate">2023-07-18</span>
</div>
</div>`;
                        newElement.setAttribute("class", "mv_content");

                        // 将新元素插入到目标元素中
                        targetElement.appendChild(newElement);
                        // 更新页面中相应元素的内容
                        let mvImg = document.querySelectorAll(".mv_img");
                        let mvSongName = document.querySelectorAll(".mv_singname_a");
                        let mvSingerName = document.querySelectorAll(".mv_singer_a");
                        let mvPlaycnt = document.querySelectorAll(".click");

                        // 获取最后一个元素
                        mvImg = mvImg[mvImg.length - 1];
                        mvSongName = mvSongName[mvSongName.length - 1];
                        mvSingerName = mvSingerName[mvSingerName.length - 1];
                        mvPlaycnt = mvPlaycnt[mvPlaycnt.length - 1];

                        // console.log(mvImg);
                        // console.log(mvSongName);

                        mvImg.src = songData.picurl;
                        mvSongName.innerHTML = songData.title;
                        mvSingerName.innerHTML = songData.singers[0].name;
                        mvPlaycnt.innerHTML = songData.playcnt;
                    }
                }

            } else {
                console.log("Error loading JSON file:", xhr.status);
            }
        };

        // 发送GET请求以异步方式加载JSON文件
        xhr.open("GET", jsonDataFile, true);
        xhr.send();
    }
}

updatePageContent();
