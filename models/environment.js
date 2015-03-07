/**
 * Created by trump.wang on 2015/3/7.
 */
function Model(){
    if(!(this instanceof  Model)) {
        return new Model();
    }
    this.id = Date.now() + '_' + parseInt( Math.random() * 1000 );

    this.name = '';

    this.url = '';

    this.phones = []; // { number:'', type: '' }

};

module.exports = Model;