module.exports=function(e,n,o){n instanceof L.Marker?(o=o.isValid()?e.getBoundsZoom(o)+2:10,e.setView(n.getLatLng(),o)):"getBounds"in n&&n.getBounds().isValid()&&e.fitBounds(n.getBounds())};