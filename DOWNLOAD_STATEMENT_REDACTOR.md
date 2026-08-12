# Getting the complete Statement Redactor from Codex Cloud

Codex Cloud pull requests do not support committed binary files. The application is
therefore included as normal source files in the `StatementRedactor` directory rather
than as a ZIP committed to Git.

## Download through the pull request

1. In Codex Cloud, press **Create PR**. The pull request can now be created because it
   contains no generated binary archive.
2. Open the pull request on GitHub.
3. Click the green **Code** button, then **Download ZIP**. This downloads the complete
   repository, including the `StatementRedactor` directory and all application files.
4. Extract the downloaded repository ZIP on Windows.
5. Open the extracted `StatementRedactor` directory and double-click
   `start_redactor.bat`.

## Create a StatementRedactor-only ZIP on Windows

After downloading and extracting the repository, double-click:

```text
package_statement_redactor.bat
```

That creates `StatementRedactor-Windows-Source.zip` locally. No binary ZIP needs to pass
through Codex Cloud or the pull request.

The first application launch installs its Python dependencies. After those dependencies
and local Tesseract are installed, statement processing works offline.
