"""API calls."""

# from server import app
# import requests
# import json
# from flask import request, jsonify
# import os

# @app.route("/api/search-movies", methods=["POST"])
# def get_search_result():
#     """Get search results."""
#     print('test search')
#     movie_keyword = request.json.get("keyword")
    
#     payload = {'query': {movie_keyword},
#                'api_key': os.environ['API_KEY']}

#     res = requests.get('https://api.themoviedb.org/3/search/movie', params=payload)

#     movies = res.json()
#     print(res.json())

#     # return a list of movie json objects
#     return jsonify(movies["results"])


 





