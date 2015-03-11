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

    this.accounts = []; // { number:'', type: '' }

    //this._phones = [];

    this.accountStr = '';

    this.isAuto = false;

    this.type = 'sw';

}

module.exports = Model;
