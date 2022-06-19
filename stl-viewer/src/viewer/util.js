//	Load a text resource from file over network
export const loadTextResource = function(url, callback) {
	var request = new XMLHttpRequest();
	request.open('GET', url + '?please-dont-cache=' + Math.random(), true);
	request.onload = function() {
		if (request.status < 200 || request.status > 299) {
			callback('Error: HTTP status ' + request.status + ' on resource ' + url);
		} else {
			callback(null, request.responseText);
		}
	};
	request.send();
};

export const loadImage = function(url, callback) {
	var image = new Image();
	image.onload = function() {
		callback(null, image);
	};
	image.src = url;
};

export const loadJSONResource = function(url, callback) {
	loadTextResource(url, function(err, result) {
		if (err) {
			callback(err);
		} else {
			try {
				callback(null, JSON.parse(result));
			} catch (e) {
				callback(e);
			}
		}
	});
};

export const compileShader = function(gl, shaderType, listing) {
  const shader = gl.createShader(shaderType);
  gl.shaderSource(shader, listing);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const errorInfo = gl.getShaderInfoLog(shader);
    console.error('ERROR compiling shader: ', errorInfo);
    throw new Error(errorInfo);
  }
  return shader;
}

export const linkProgram = function(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const errorInfo = gl.getGetProgramInfoLog(program);
    console.log('ERROR linking program!', errorInfo);
    throw new Error(errorInfo);
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    const errorInfo = gl.getGetProgramInfoLog(program);
    console.log('ERROR linking program!', errorInfo);
    throw new Error(errorInfo);
  }

  return program;
}

export const initGL = function(canvas, enableDepthTest, enableBackfaceCulling) {
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.log('WebGl not supported. Falling back on experimental');
      gl = canvas.getContext('experimental-webgl');
    }

    if (!gl) {
      alert('WebGl not supported.');
    }

    if (enableDepthTest)
        gl.enable(gl.DEPTH_TEST);

    if (enableBackfaceCulling) {
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
        gl.enable(gl.CULL_FACE);
    }

    return gl;
}

export const loadTexture = function(gl, image) {
    if (!image)
        throw new Error("Invalid image is used to create a texture.");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
    );
    gl.bindTexture(gl.TEXTURE_2D, null);
    return texture;
};
