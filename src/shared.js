import store from './store/store'

export default {

    prepareDataBeforeSaving: function(data) {
        let newData = Array.from(data)
        newData.forEach(el => {
            el.created_on['date'] = el.created_on['$date']
            delete el.created_on['$date'];
        })
        return newData
    },

    prepareDataAfterLoad: function(data,isAccess) {
        data.forEach(el => {
			el.created_on['$date'] = el.created_on['date'];
            delete el.created_on['date'];
            
            if(isAccess && !el.hasOwnProperty('permissions'))
                el['permissions'] = []

        });
        
        return data
    },

    axiosTokenErrorCatcher(error){
        if (error.response.status == 401) store.dispatch('systemUser/logout');
		return {
			error: error.response.statusText,
			status: error.response.status
		};
    }
}