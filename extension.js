const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "create_fca_feature.create_feature",
    async function (uri) {
      const featureName = await vscode.window.showInputBox({
        prompt: "Enter the feature name",
      });
      if (!featureName && !uri) return;
      const folderPath = uri.fsPath;

      const featureFolderPath = path.join(folderPath, featureName);

      const subfolders = [
        // data
        "data/datasource",
        "data/model",
        "data/repository",
        // domain
        "domain/entities",
        "domain/repository",
        "domain/usecases",
        // presentation
        "presentation/screens",
        "presentation/state",
        "presentation/widgets",
      ];

      subfolders.forEach((subfolder) => {
        const folderPath = path.join(featureFolderPath, subfolder);
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true });
        }
      });

      vscode.window.showInformationMessage(
        `${featureName} feature created successfully`
      );
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
