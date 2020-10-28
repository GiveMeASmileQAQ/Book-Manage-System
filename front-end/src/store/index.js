import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    student: {
      studentId: "",
      studentName: "",
      studentGender: "",
      studentAge: "",
      studentEmail:"",
      studentGrade: "",
      studentContact: "",
      studentDept: "",
      studentMajor: ""
    }
  },
  mutations: {
    initStudent(state, std) {
      state.student.studentId = std.studentId;
      state.student.studentName = std.studentName;
      state.student.studentGender = std.studentGender;
      state.student.studentEmail = std.studentEmail;
      state.student.studentAge = std.studentAge;
      state.student.studentGrade = std.studentGrade;
      state.student.studentContact = std.studentContact;
      state.student.studentDept = std.studentDept;
      state.student.studentMajor = std.studentMajor;
    }
  },
  actions: {
    getInitStudent(context,std){
      context.commit('initStudent',std);
    },
  },
});
