var EventEmitter = require('events').EventEmitter;

global.$ = window.jQuery;
global.atEmitter = window.atEmitter = new EventEmitter();

// EnvList Component.
var EnvList = React.createClass({
  render: function () {
    var envNodes = this.props.envs.map(function (env) {
      return (
        <Env info={env} />
      );
    });

    return (
      <div className="env-list">{ envNodes }</div>
    );
  }
});

// Env Component.
var Env = React.createClass({
  render: function () {
    var envInfo = this.props.info;

    return (
      <div className="environment">
        <div className="page-header" id={envInfo.id}>
          <h1>
            {envInfo.name}
            <p className="env-meta">
              <span className="env-url">{envInfo.url}</span> &nbsp;
              <span className="env-type label label-default">{envInfo.type}</span> &nbsp;
              <span className="env-from">
                <i className="glyphicon glyphicon-share" data-toggle="tooltip" data-placement="bottom" title="Imported from Wiki Page"></i>
                <i className="glyphicon glyphicon-edit" data-toggle="tooltip" data-placement="bottom" title="Edited Manually"></i>
              </span>
            </p>
            <p className="env-action">
              <button className="btn btn-info btn-xs">
                <i className="glyphicon glyphicon-edit"></i> Edit
              </button>
              <button className="btn btn-danger btn-xs" data-toggle="modal" data-target={'#removeConfirmModal-' + envInfo.id}>
                <i className="glyphicon glyphicon-remove"></i> Remove
              </button>
            </p>
          </h1>
        </div>

        <AccountList accounts={envInfo.accounts} />
      </div>
    );
  }
});

// AccountList Component.
var AccountList = React.createClass({
  render: function () {

    var accountNodes = this.props.accounts.map(function (account) {
      return <Account account={account} />;
    });

    return (
      <div className="account-list">
        <table className="table table-striped">
          <thead>
            <th>Account Number</th>
            <th>Account Type</th>
            <th>Open with</th>
          </thead>
          {accountNodes}
        </table>
      </div>
    );
  }
});

// Account Component.
var Account = React.createClass({
  render: function () {
    var accountInfo = this.props.account;
    var browserNodes = app.getBrowsers().map(function (bs) {
      return <Browser name={bs} />;
    });

    return (
      <tr className="account">
        <td>{accountInfo.number}</td>
        <td>{accountInfo.type}</td>
        <td>{browserNodes}</td>
      </tr>
    );
  }
});

var Browser = React.createClass({
  render: function () {
    var name = this.props.name;

    return (
      <a href="#" className={getLabelClassName(name)}
         data-name={name} data-toggle="tooltip" title={'Open with - ' + name }>
        <i className={ 'icon icon-' + name }></i>
      </a>
    );

    function getLabelClassName (name) {
      var className;

      switch (name) {
        case 'ie':
          className = 'label-info'; break;
        case 'firefox':
          className = 'label-danger'; break;
        case 'chrome':
          className = 'label-warning'; break;
        case 'safari':
          className = 'label-default';
      }
      className = className + ' label';

      return className;
    }
  }
});

var AT = require('../app/lib/services/at.js');
var app = new AT();

app.init();
React.render(<EnvList envs={app.getEnv()} />, document.querySelector('.environments'));