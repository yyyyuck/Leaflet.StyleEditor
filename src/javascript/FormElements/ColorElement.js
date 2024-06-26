import 'leaflet'

/**
 *  FormElement used to style the color
 */
export default function setupColorElement () {
  L.StyleEditor.formElements.ColorElement = L.StyleEditor.formElements.FormElement.extend({

    createContent: function () {
      this.options.colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker',
        this.options.uiElement)
      this._getColorRamp().forEach(this._setSelectCallback, this)
    },

    /** create of get already created colorRamp */
    _getColorRamp: function () {
      if (!this.options.colorRamp) {
        // if markers have own colorRamp use it
        if (this.options.parentForm instanceof L.StyleEditor.forms.MarkerForm && !!this.options.styleEditorOptions.markerType.options.colorRamp) {
          this.options.colorRamp = this.options.styleEditorOptions.markerType.options.colorRamp
          // else use the default
        } else {
          this.options.colorRamp = this.options.styleEditorOptions.colorRamp
        }
      }
      return ['#2A81CB', '#FFD326', '#CB2B3E', '#2AAD27', '#CB8427', '#CAC428', '#9C2BCB', '#7B7B7B', '#3D3D3D']
    },

    /** define what to do when color is changed */
    _setSelectCallback: function (color) {
      let elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', this.options.colorPickerDiv)
      elem.style.backgroundColor = color
      L.DomEvent.addListener(elem, 'click', this._selectColor, this)
    },

    /** set style for chosen color */
    _selectColor: function (e) {
      e.stopPropagation()
      this.setStyle(
        this.options.styleEditorOptions.util.rgbToHex(
          e.target.style.backgroundColor
        )
      )

      // marker styling needs additional function calls
      if (this.options.styleEditorOptions.currentElement.target instanceof L.Marker) {
        this.options.styleEditorOptions.markerType.setNewMarker()
      }
    }
  })
}
