module.exports = {
    "verbose": true,
    "moduleNameMapper": {
        "^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "^.+\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    "setupFiles": ["jest-localstorage-mock"],
    "setupTestFrameworkScriptFile": "jest-enzyme",    
    "testEnvironment": "enzyme",
    "testEnvironmentOptions": {
      "enzymeAdapter": "react16"
    },
    "transform": {
        "^.+\\.jsx?$": "babel-jest"
    }
};
