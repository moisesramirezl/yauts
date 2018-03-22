'use babel';

import YautsView from './yauts-view';
import { CompositeDisposable } from 'atom';

export default {

  yautsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.yautsView = new YautsView(state.yautsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.yautsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'yauts:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.yautsView.destroy();
  },

  serialize() {
    return {
      yautsViewState: this.yautsView.serialize()
    };
  },

  toggle() {
    console.log('Yauts was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
