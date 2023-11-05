from flask import Flask, render_template, request, redirect, url_for, session, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

def fetch_user_ratings(mysql, account_id, anime_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT scores FROM ratings WHERE account_id = %s AND anime_id = %s', (account_id, anime_id))
    user_ratings = cursor.fetchall()
    if user_ratings:
        return jsonify(user_ratings), 200
    else:
        return jsonify({"msg": "No ratings found for this user and anime!"}), 404


    
def upload_user_ratings(mysql):
    if request.method == 'POST':
        data = request.get_json()
        if data and 'account_id' in data and 'anime_id' in data and 'scores' in data:
            account_id = data['account_id']
            anime_id = data['anime_id']
            scores = data['scores']

            cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)

            try:
                cursor.execute('SELECT * FROM ratings WHERE account_id = %s AND anime_id = %s', (account_id, anime_id))
                existing_rating = cursor.fetchone()

                if existing_rating:
                    # Update existing rating
                    cursor.execute('UPDATE ratings SET scores = %s WHERE account_id = %s AND anime_id = %s', (scores, account_id, anime_id))
                else:
                    # Insert new rating
                    cursor.execute('INSERT INTO ratings (account_id, scores, anime_id) VALUES (%s, %s, %s)', (account_id, scores, anime_id))

                mysql.connection.commit()
                return jsonify({"msg": "Rating updated successfully!"}), 200

            except Exception as e:
                mysql.connection.rollback()  # 回滚事务
                return jsonify({"msg": "An error occurred while updating the rating!"}), 500

        else:
            return jsonify({"msg": "Please provide all required data (account_id, anime_id, scores)!"}), 400

def fetch_nonzero_ratings(mysql, account_id):
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT cad.* FROM cleaned_anime_data cad INNER JOIN ratings r ON cad.anime_id = r.anime_id WHERE r.scores > 0 AND r.account_id = %s;', (account_id,))
    nonzero_ratings = cursor.fetchall()
    if nonzero_ratings:
        return jsonify(nonzero_ratings), 200
    else:
        return jsonify({"msg": "No ratings found for this user!"}), 404
