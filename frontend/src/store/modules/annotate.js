import Cookies from "js-cookie";
//用户标注设置
let userAnnotateSetting = Cookies.getJSON("annotate-custom-setting");
const state = {
    fontSize: 16, //初始字体大小
    isUpload: false, //是否上传数据，目前还没有用上
    textTitle: "", //标注文本标题
    typesInfo: userAnnotateSetting //分类信息
        ? userAnnotateSetting
        : [
              { value: "药物", color: "#fa0404" },
              { value: "医生", color: "#fd0dad" },
              { value: "器械", color: "#8406f3" },
              { value: "疾病", color: "#e3fc07" },
              { value: "患者", color: "#058f32" },
              { value: "病毒", color: "#1f74c9" },
          ],
    annotateData: [[], [], [], [], [], []], //存储四种类型的已标注的词语
    // TODO 是不是也可以自定义颜色
    colorArray: [
        //错误分析分类颜色
        "#fa0404",
        "#fd0dad",
        "#8406f3",
        "#d462ee",
        "#ff9b06",
        "#e3fc07",
        "#058f32",
        "#10f0fc",
        "#83fa07",
        "#e6ee66",
        "#c0e97d",
        "#aae77d",
        "#2e0bf3",
        "#0af0e1",
        "#0baff5",
        "#1f74c9",
        "#8985ec",
        "#761616",
    ],
    id: 1, //按钮id，用于查找，添加删除事件
    annotateText: `
      〔摘要〕伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械的生产过程中被广泛使用。在洁净室内的医疗器械使用压缩气体时，应根据其预期用途对控制水平和监测项目做出合理的评定，识别出安全的有关特征，结合受控项目、系统设计和监测工作进行风险分析，以满足《医疗器械生产质量管理规范附录》中对压缩气体提出的要求。
〔关键词〕医疗器械；压缩气体；预期用途；风险分析
压缩气体在医疗器械的生产过程中被广泛使用，主要用途有自动化生产设备的动力用气、清洗工艺中的吹扫用气、保护材料防止氧化的用气等。伴随着医疗器械新产品、新工艺的发展，压缩气体在医疗器械领域的使用已越来越广泛。虽然医疗器械是在洁净的受控环境中生产，但《医疗器械生产质量管理规范附录》中仍对无菌、植入、体外诊断（invitrodiagnostic，IVD）的各类医疗器械使用压缩气体都提出了验证和控制要求，其目的是为保证医疗器械最终在临床使用的安全和有效。GB/T13277.1-2008是目前可检索到的唯一对气体污染物进行等级划分的国家标准，《医用气体工程技术规范》中对部分医用空气的品质要求也是引用了此标准。结合医疗器械行业的受控环境要求，对压缩气体的污染物控制应至少包含固体、液体、气体及微生物。
1固体污染物
固体污染物主要是指压缩气体中含有的尘埃微粒。控制微粒的核心技术是使用气体过滤器。过滤器的有效过滤滤径、有效过滤效率和有效工作流量直接影响到固体污染物的预期控制效果，保证过滤器的各项性能参数均符合使用工况状态是十分必要的。同一气体过滤器在不同流量状态下监测的过滤效果，见表1。`,
    //文本内容
};

/**
 * 因为用户可能已经自定义了标注分类，所以要判断一下
 */
if (userAnnotateSetting) {
    state.annotateData = [];
    for (let i = 0; i < userAnnotateSetting.length; i++) {
        state.annotateData.push([]);
    }
}

const mutations = {
    /**
     * @description 将标注文本添加列表，并上传至后台
     * @param  state
     * @param  info 对象，存id和文本
     */
    addToList: (state, info) => {
        let text = info.text;
        let index = parseInt(info.id.charAt(0));
        state.annotateData[index].push(text);
    },
    /**
     * @description 删除list中的标注记录
     * @param  state
     * @param  info 对象，存储需要删除已标注文本的id，文本
     */
    deleteAnnotatedText: (state, info) => {
        let index = parseInt(info.type.split("-")[0]);
        for (let i = state.annotateData.length - 1; i >= 0; i--) {
            if (state.annotateData[index][i] === info.text) {
                state.annotateData[index].splice(i, 1);
                break;
            }
        }
    },
    /**
     * 设置文本标题
     */
    setTextTitle(state, title) {
        state.textTitle = title;
    },
    /**
     * @description 重置已标注数据
     * @param {*} state
     */
    resetAnnotateData: (state) => {
        // TODO 有没有更好的办法重置呢
        state.annotateData = [];
        let length = state.typesInfo.length;
        for (let i = 0; i < length; i++) {
            state.annotateData.push([]);
        }
    },
    /**
     * 设置标注文本
     */
    setAnnotateText: (state, text) => {
        state.annotateText = text;
    },
};

const actions = {
    addToList({ commit }, info) {
        commit("addToList", info);
    },
    deleteAnnotatedText({ commit }, info) {
        commit("deleteAnnotatedText", info);
    },
    resetAnnotateData({ commit }) {
        commit("resetAnnotateData");
    },
    setTextTitle({ commit }, title) {
        commit("setTextTitle", title);
    },
    setAnnotateText({ commit }, text) {
        commit("setAnnotateText", text);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
