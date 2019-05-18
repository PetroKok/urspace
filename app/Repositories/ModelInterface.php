<?php


namespace App\Repositories;


use Illuminate\Database\Eloquent\Model;

interface ModelInterface
{
    public function index();
    public function store(array $data);
    public function update(array $data, Model $model);
}