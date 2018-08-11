/**
`f-offline-cross-storage`
Wrapper of f-cross-storage element, providing offline support

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';
import {html} from '@polymer/polymer/polymer-element.js';

import '@polymer/app-storage/app-indexeddb-mirror/app-indexeddb-mirror.js';
import 'f-cross-storage/f-cross-storage.js';
FirmFirm.OfflineCrossStorage = class OfflineCrossStorage extends FirmFirm.CrossStorage {
  static get template() {
    return html`
    <!-- inherited behavior -->
    <f-singleton key="{{key}}" value="{{value}}"></f-singleton>
    <!-- extension -->
    <app-indexeddb-mirror key="[[key]]" session="[[session]]" data="{{value}}" persisted-data="{{_persistedData}}">
  </app-indexeddb-mirror>
`;
  }

  static get is() { return 'f-offline-cross-storage'; }
  static get properties() {
    return {
      /**
       * Any string value that uniquely identifies the current session.
       * Whenever this value changes, the data stored at key will be deleted.
       * This is useful for handling scenarios such as user session changes (e.g., logout).
       */
      session: String,
      _persistedData: {
        type: Object,
        observer: '_persistedChanged'
      },
    };
  }

  _persistedChanged(persisted) {
    if (!this.value && this.value !== persisted) {
      this.value = persisted;
    }
  }
}
customElements.define(FirmFirm.OfflineCrossStorage.is, FirmFirm.OfflineCrossStorage);
