;; In file
;; http://stackoverflow.com/questions/7334565/how-can-i-move-php-mode-settings-from-emacs-to-dir-locals-el/7340962#7340962
((nil .
   ((eval .
       (progn
         (add-to-list 'auto-mode-alist '("\\.js\\'" . react-mode))
         (setq flycheck-javascript-eslint-executable
           (expand-file-name (concat default-directory "node_modules/.bin/eslint")))
         )
       ))))
