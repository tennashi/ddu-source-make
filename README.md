# ddu-source-make
`make` source for `ddu.vim`

This source collects make targets from Makefile.

# Required
* [vim-denops/denops.vim](https://github.com/vim-denops/denops.vim)
* [Shougo/ddu.vim](https://github.com/Shougo/ddu.vim)

# Example

```vim
" Set default kind action.
call ddu#custom#patch_global({
\ 'kindOptions': {
\   'make': {
\     'defaultAction': 'run',
\   },
\})

" Use make source.
call ddu#start({'sources': [{'name': 'make'}]})
```
