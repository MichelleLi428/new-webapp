FROM nginx
LABEL name="mli10"
LABEL email="michelle.li@bmo.com"
# label is optional field 
COPY . /usr/share/nginx/html/