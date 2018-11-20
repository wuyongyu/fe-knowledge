TPP
===

1. 安装gnupg：`brew install gnupg`
2. `gpg --keyserver hkp://keys.gnupg.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB`
3. 安装rvm：`\curl -sSL https://get.rvm.io | bash -s stable`
4. 安装ruby：`rvm install "ruby-1.8.7-head"`
5. `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" < /dev/null 2> /dev/null`
6. 安装tpp：`brew install tpp`
7. 安装ncurses：
  - `curl -O ftp://ftp.gnu.org/gnu/ncurses/ncurses-5.9.tar.gz` 
  - `tar -xzvf ncurses-5.9.tar.gz` 
  - `cd ./ncurses-5.9`
   `./configure --prefix=/usr/local \ 
  --without-cxx --without-cxx-binding --without-ada --without-progs --without-curses-h \ 
  --with-shared --without-debug \ 
  --enable-widec --enable-const --enable-ext-colors --enable-sigwinch --enable-wgetch-events \ 
  && make`
  - `sudo make install`
8. 安装ncurses-ruby：gem install ncurses-ruby
  