FROM oraclelinux:8.7
LABEL NAME="michelle"
RUN yum install python3 -y
WORKDIR  /bmo/mli10app/
# creating and change directory
COPY myapp.py .
RUN useradd mli10app
USER mli10app
CMD [ "python3", "myapp.py"]