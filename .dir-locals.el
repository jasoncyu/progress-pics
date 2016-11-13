((nil .
   (
     (add-to-list 'auto-mode-alist '("\\.js\\'" . react-mode))
     (eval .
       '(setq flycheck-javascript-eslint-executable
          (expand-file-name (concat default-directory "node_modules/.bin/eslint")))))))
