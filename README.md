# ddu-source-make
`make` source for `ddu.vim`

This source collects make targets from Makefile.

# Required
* [vim-denops/denops.vim](https://github.com/vim-denops/denops.vim)
* [Shougo/ddu.vim](https://github.com/Shougo/ddu.vim)
* [tennashi/ddu-kind-extcmd](https://github.com/tennashi/ddu-kind-extcmd)

# Example

```vim
" Use make source.
call ddu#start({'sources': [{'name': 'make'}]})
```
