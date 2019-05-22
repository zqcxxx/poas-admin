import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '问卷系统',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/showsurvey/:id',
    component: () => import('@/views/showsurvey/index'),
    hidden: true
  },

  {
    path: '/showresult/:id',
    component: () => import('@/views/showresult/index'),
    hidden: true
  },

  {
    path: '/survey',
    component: Layout,
    redirect: '/survey/question',
    name: 'Survey',
    meta: {
      title: '调查',
      icon: 'form'
    },
    children: [
      {
        path: 'question',
        component: () => import('@/views/survey/question/index'),
        name: 'Question',
        meta: { title: '问题', icon: 'clipboard' }
      },
      {
        path: 'questionnaire',
        component: () => import('@/views/survey/questionnaire/index'),
        name: 'Questionnaire',
        meta: { title: '问卷', icon: 'edit' },
        children: [
          {
            path: 'addquestionnaire',
            component: () => import('@/views/survey/questionnaire/addquestionnaire'),
            name: 'Addquestionnaire',
            meta: { title: '添加问卷', icon: 'edit' }
          },
          {
            path: 'questionnairelist',
            component: () => import('@/views/survey/questionnaire/questionnairelist'),
            name: 'Questionnairelist',
            meta: { title: '问卷列表', icon: 'edit' }
          }
        ]
      }
    ]
  },

  {
    path: '/result',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Result',
        component: () => import('@/views/result/index'),
        meta: { title: '分析结果', icon: 'chart' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
